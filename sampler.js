function reMap(m) {
    if (m.velocity > 0.1) {
      return mapGroup1[m.note]
    } else {
      return mapGroup2[m.note]
    }
  }
  
  const mapGroup1 = {
    36: ['C1', 0],
    38: ['C2', 2],
    42: ['C3', 4],
    45: ['C4', 6],
    46: ['C5', 8],
    48: ['C6', 9],
    49: ['C7', 11],
    50: ['C8', 13],
    51: ['C9', 15]
  }
  
  const mapGroup2 = {
    36: ['A1', 1],
    38: ['A2', 3],
    42: ['A3', 5],
    45: ['A4', 7],
    46: ['C5', 8],
    48: ['A6', 10],
    49: ['A7', 12],
    50: ['A8', 14],
    51: ['C9', 15]
  }
  
  const sampleMap = {
    C1: 'BD1.WAV',
    A1: 'BD2.WAV',
    C2: 'SD.WAV',
    A2: 'SD2.WAV',
    C3: 'LT.WAV',
    A3: 'MT.WAV',
    C4: 'HT.WAV',
    A4: 'LC.WAV',
    C5: 'RS.WAV', 
    C6: 'CP.WAV',
    A6: 'CP2.WAV',
    C7: 'CY3.WAV',
    A7: 'CY.WAV',
    C8: 'OH.WAV',
    A8: 'OH1.WAV',
    C9: 'CH.WAV'
  }
  
  const reverb = new Tone.Reverb({
    wet: 0.25
  }).toDestination();
  
  const sampler = new Tone.Sampler(sampleMap).connect(reverb);