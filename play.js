Tone.Transport.scheduleRepeat(() => {
  
    new Tone.Part(
      ((time, value) => {
        sampler.triggerAttackRelease(
          value.note,
          undefined,
          time,
          value.velocity + 0.25);
      }),
      synthSeq).start();
    
    display = Array.from(synthSeq);
    playheadX = 0;
  },
                                "1n");