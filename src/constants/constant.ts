interface IConstant {
  DATE_FORMAT_STRING: string;
  TIME_FORMAT_STRING: string;
  DATE_TIME_FORMAT_STRING: string;
  pagination: {
    limit: number;
    page: number;
    offset: number;
  };
}

const constant: IConstant = {
  DATE_FORMAT_STRING: "DD-MM-YYYY",
  TIME_FORMAT_STRING: "hh:mm:ss A",
  DATE_TIME_FORMAT_STRING: "DD-MM-YYYY hh:mm:ss A",
  pagination: {
    limit: 10,
    page: 1,
    offset: 0,
  },
};

export default constant;
