function regnUt(mult, t1, t2, t3) {
    if (!Number.isInteger(mult) || mult < 3 || mult > 8) {
      console.log("Feil: 'mult' må være et heltall mellom 3 og 8.");
      return false;
    }
  
    if (![t1, t2, t3].every(num => Number.isInteger(num) && num >= 1 && num <= 6)) {
      console.log("Feil: 't1', 't2' og 't3' må være heltall mellom 1 og 6.");
      return false;
    }
  
    return (t1 + t2 + t3) * mult;
  }
  
  
  