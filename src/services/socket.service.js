let ioInstance;

exports.setIO = (io) => {
  ioInstance = io;
};

exports.getIO = () => {
  return ioInstance;
};