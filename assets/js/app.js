document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".calculator-form");
  const inputDay = document.querySelector("#input-day");
  const inputMonth = document.querySelector("#input-month");
  const inputYear = document.querySelector("#input-year");

  const resultYears = document.querySelector(".years");
  const resultMonths = document.querySelector(".months");
  const resultDays = document.querySelector(".days");

  const inputs = document.querySelectorAll("input");
  const errorMsgs = document.querySelectorAll(".error-msg");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const day = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value);
    const year = parseInt(inputYear.value);
    const birthday = new Date(year, month - 1, day);
    const today = new Date();

    // validation check
    errorMsgs.forEach((msg) => (msg.textContent = ""));

    let isValid = true;

    // - Any field is empty when the form is submitted
    inputs.forEach((input, index) => {
      const errorMsg = errorMsgs[index];
      if (!input.value) {
        errorMsg.textContent = "This field is required";
        isValid = false;
      }
    });

    // - The day number is not between 1-31
    if (!(1 <= day && day <= 31)) {
      errorMsgs[0].textContent = "Must be a valid day";
      isValid = false;
    }

    // - The month number is not between 1-12
    if (!(1 <= month && month <= 12)) {
      errorMsgs[1].textContent = "Must be a valid month";
      isValid = false;
    }

    // - The date is in the future
    if (birthday > today) {
      errorMsgs[0].textContent = "Must be in the past";
      isValid = false;
    }

    // - The date is invalid e.g. 31/04/1991
    if (isNaN(birthday.getTime())) {
      errorMsgs[0].textContent = "Must be a valid date";
      isValid = false;
    }

    if (!isValid) return; // 유효성 검사를 통과하지 못하면 계산을 진행하지 않음

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

    console.log(
      "birthday: ",
      day,
      month,
      year,
      ", result: ",
      ageDays,
      ageMonths,
      ageYears
    );

    resultYears.textContent = ageYears;
    resultMonths.textContent = ageMonths;
    resultDays.textContent = ageDays;
  });
});
