import { toast } from "react-toastify";

const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const toUrl = (url) => {
  return url?.toLowerCase().replaceAll(" ", "+");
};

export const normaliseUrl = (url) => {
  return url?.toLowerCase().replaceAll(/\+/g, " ");
};

export const capitalize = (text) => {
  var words = text.replace("+", " ").split(" ");
  var CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(" ");
};

export const getMonths = (till) => {
  const dates = [];
  let date = new Date();
  for (let i = 1; i <= till; i++) {
    date.setMonth(date.getMonth() - 1);
    dates.push({
      value: `${monthName[date.getMonth()]}-${date.getFullYear()}`,
      text: `${monthName[date.getMonth()]}-${date.getFullYear()}`,
    });
  }
  return dates;
};

export const getLastMonth = () => {
  const date = new Date();
  return `${monthName[date.getMonth() - 1]}-${date.getFullYear()}`;
};

// export const isACP = (window.location.hostname == "uatanalytics.pedgog.in")
// export const isACP = (window.location.hostname === config.ACP_HOST)
export const isACP = true;

// export const isAP = (window.location.hostname === config.AP_HOST)
export const isAP = true;

export const notifySuccessSave = () => {
  toast.success("Saved successfully", {
    theme: "colored",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

export const notifyError = () => {
  toast.error("Oops..! Something went wrong !", {
    theme: "colored",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
