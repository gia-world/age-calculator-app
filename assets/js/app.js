document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".calculator-form");

  const resultYears = document.querySelector(".years");
  const resultMonths = document.querySelector(".months");
  const resultDays = document.querySelector(".days");

  const inputs = document.querySelectorAll("input");
  const errorMsgs = document.querySelectorAll(".error-msg");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const today = new Date();
    let errorObj = {};
    let inputObj = {};

    // 초기화 및 세팅
    inputs.forEach((input) => {
      const errorMessageElement = input.nextElementSibling;
      errorMessageElement.textContent = "";
      inputObj[input.id] = input;
    });

    const day = parseInt(inputObj["input-day"].value);
    const month = parseInt(inputObj["input-month"].value);
    const year = parseInt(inputObj["input-year"].value);
    const birthday = new Date(year, month - 1, day);

    // validation check
    if (!day) {
      errorObj.day = "This field is required";
    } else if (!(1 <= day && day <= 31) || isNaN(day)) {
      errorObj.day = "Must be a valid day";
    }

    if (!month) {
      errorObj.month = "This field is required";
    } else if (!(1 <= month && month <= 12) || isNaN(month)) {
      errorObj.month = "Must be a valid month";
    }

    if (!year) {
      errorObj.year = "This field is required";
    } else if (isNaN(year)) {
      errorObj.year = "Must be a valid year";
    }

    if (day && month && year && !birthday.getTime()) {
      errorObj.day = "Must be a valid date";
    } else if (birthday > today) {
      errorObj.day = "Must be in the past";
    }

    console.log(errorObj, inputObj);
    Object.keys(errorObj).forEach((key) => {
      const inputElement = inputObj[`input-${key}`];
      const errorMessageElement = inputElement.nextElementSibling;
      errorMessageElement.textContent = errorObj[key];
    });

    if (Object.keys(errorObj).length > 0) return;

    // calculate age
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let ageYears = currentYear - year;

    // 생일이 지나지 않았으면 나이 -1
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      ageYears--;
    }

    let ageMonths = currentMonth - month;
    if (ageMonths < 0) {
      ageMonths += 12;
    }

    let ageDays = currentDay - day;
    if (ageDays < 0) {
      const lastMonth = new Date(currentYear, currentMonth - 1, 0);
      ageDays = lastMonth.getDate() - day + currentDay;
      ageMonths--;
    }

    resultYears.textContent = ageYears;
    resultMonths.textContent = ageMonths;
    resultDays.textContent = ageDays;
  });
});
