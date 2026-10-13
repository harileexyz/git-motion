import { StructuredArchitecture, DataflowStep } from "./architecture";
import { ModuleCluster } from "./types";

export function generateRepoMermaid(architecture: StructuredArchitecture): string {
  const { tiers, flowSteps } = architecture;

  let mermaid = "```mermaid\nflowchart LR\n";
  mermaid += "    %% Styling\n";
  mermaid += "    classDef tierStyle fill:#161b26,stroke:#7aa2f7,stroke-width:2px,color:#fff,rx:8px;\n";
  mermaid += "    classDef activeStyle fill:#1e293b,stroke:#00f3ff,stroke-width:3px,color:#00f3ff,rx:8px;\n";
  mermaid += "    classDef fileStyle fill:#0f172a,stroke:#334155,stroke-width:1px,color:#94a3b8,rx:4px;\n\n";

  // Subgraphs for each tier
  tiers.forEach((tier, i) => {
    const tierId = `T${i + 1}`;
    mermaid += `    subgraph ${tierId} ["${tier.title}"]\n`;
    tier.modules.forEach((mod) => {
      mermaid += `        ${mod.id}["${mod.name} (${mod.primaryLanguage})"]:::tierStyle\n`;
    });
    mermaid += "    end\n\n";
  });

  // Flow links
  flowSteps.forEach((step) => {
    mermaid += `    ${step.sourceModule.toLowerCase()} -->|"${step.title}"| ${step.targetModule.toLowerCase()}\n`;
  });

  mermaid += "```";
  return mermaid;
}

export function generateModuleMermaid(module: ModuleCluster): string {
  let mermaid = "```mermaid\nflowchart LR\n";
  mermaid += "    %% Module Boundary Architecture\n";
  mermaid += "    classDef moduleHero fill:#0f172a,stroke:#00f3ff,stroke-width:3px,color:#fff,rx:12px;\n";
  mermaid += "    classDef callerStyle fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#86efac,rx:8px;\n";
  mermaid += "    classDef depStyle fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#c7d2fe,rx:8px;\n\n";

  // Inbound Callers
  if (module.inboundDependencies.length > 0) {
    mermaid += "    subgraph InboundCallers [\"Inbound Consumers\"]\n";
    module.inboundDependencies.forEach((dep) => {
      mermaid += `        in_${dep}["${dep}"]:::callerStyle\n`;
    });
    mermaid += "    end\n\n";
  }

  // Hero Module Subgraph
  mermaid += `    subgraph TargetModule ["Subsystem: ${module.name}"]\n`;
  mermaid += `        core_${module.id}["${module.name} Core\\n(${module.fileCount} files • ${module.loc} LOC)"]:::moduleHero\n`;
  mermaid += "    end\n\n";

  // Outbound Dependencies
  if (module.outboundDependencies.length > 0) {
    mermaid += "    subgraph OutboundDeps [\"Outbound Dependencies\"]\n";
    module.outboundDependencies.forEach((dep) => {
      mermaid += `        out_${dep}["${dep}"]:::depStyle\n`;
    });
    mermaid += "    end\n\n";
  }

  // Connections
  module.inboundDependencies.forEach((dep) => {
    mermaid += `    in_${dep} -->|"imports"| core_${module.id}\n`;
  });

  module.outboundDependencies.forEach((dep) => {
    mermaid += `    core_${module.id} -->|"calls"| out_${dep}\n`;
  });

  mermaid += "```";
  return mermaid;
}
