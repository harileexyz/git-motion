import fs from "fs";
import path from "path";

// Generate 30 seconds of ambient cyber soundtrack at 44.1kHz 16-bit PCM
const sampleRate = 44100;
const durationSeconds = 32;
const numSamples = sampleRate * durationSeconds;
const buffer = Buffer.alloc(44 + numSamples * 2);

// Write WAV header
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
buffer.writeUInt16LE(1, 22); // NumChannels (1 = mono)
buffer.writeUInt32LE(sampleRate, 24); // SampleRate
buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
buffer.writeUInt16LE(2, 32); // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write("data", 36);
buffer.writeUInt32LE(numSamples * 2, 40);

// Synthesize ambient sci-fi soundscape
// Low root drone (55Hz / 110Hz) + warm 5th (165Hz) + periodic rhythmic pulses
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;

  // Root drone: 110Hz + 55Hz sub-bass
  const sub = Math.sin(2 * Math.PI * 55 * t) * 0.25;
  const root = Math.sin(2 * Math.PI * 110 * t) * 0.2;
  const fifth = Math.sin(2 * Math.PI * 164.81 * t) * 0.12;

  // Slow harmonic filter sweep (0.15Hz)
  const lfo = (Math.sin(2 * Math.PI * 0.15 * t) + 1) * 0.5;
  const octave = Math.sin(2 * Math.PI * 220 * t) * 0.08 * lfo;

  // Step transition pulse every 7.5 seconds
  const stepT = t % 7.5;
  let pulse = 0;
  if (stepT < 1.2) {
    const decay = Math.exp(-stepT * 3.5);
    // Electronic shimmer chord (440Hz + 660Hz)
    pulse = (Math.sin(2 * Math.PI * 440 * stepT) + Math.sin(2 * Math.PI * 660 * stepT)) * 0.18 * decay;
  }

  // Soft vinyl / tape texture
  const noise = (Math.random() * 2 - 1) * 0.008;

  // Master fade-in (first 1.5s) and fade-out (last 2s)
  let envelope = 1.0;
  if (t < 1.5) envelope = t / 1.5;
  else if (t > durationSeconds - 2.0) envelope = (durationSeconds - t) / 2.0;

  const sampleFloat = (sub + root + fifth + octave + pulse + noise) * envelope * 0.7;
  const sampleInt16 = Math.max(-32767, Math.min(32767, Math.round(sampleFloat * 32767)));

  buffer.writeInt16LE(sampleInt16, 44 + i * 2);
}

const outDir = path.resolve("./public/audio");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, "ambient-cyber.wav");
fs.writeFileSync(outPath, buffer);
console.log(`✓ Synthesized ambient cyber soundtrack: ${outPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
