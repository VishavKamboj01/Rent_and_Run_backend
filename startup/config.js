import config from "config";

export default () => {
  if (!config.get("jwtPrivateKey"))
    throw new Error("FATEL ERROR: jwtPrivateKey is not set!");
};
