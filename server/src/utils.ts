const emails: any = {};

const Hour: number = 5000;

const rateLimiter = (email: string): boolean => {
  if (emails[email]) {
    if (Date.now() - emails[email] >= Hour) {
      emails[email] = Date.now();
      return true;
    } else {
      throw new Error("Rate limited, try in an hour.");
    }
  } else {
    emails[email] = Date.now();
    return true;
  }
};

export default rateLimiter;
