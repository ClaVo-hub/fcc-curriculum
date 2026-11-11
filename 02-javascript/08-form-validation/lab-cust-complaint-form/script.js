const form = document.getElementById("form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const qty = document.getElementById("quantity");

const complaintsGroup = document.getElementById("complaints-group");
const complaintTextDiv = document.getElementById(
  "complaint-description-container",
);
const complaintDesc = document.getElementById("complaint-description");
const complaintOther = document.getElementById("other-complaint");

const solutionsGroup = document.getElementById("solutions-group");
const solutionDesc = document.getElementById("solution-description");
const solutionTextDiv = document.getElementById(
  "solution-description-container",
);
const solutionOther = document.getElementById("other-solution");

const btnContainer = document.getElementById("btn-container");
const submitBtn = document.getElementById("submit-btn");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalTitle = document.getElementById("modal-title");
const modalIconContainer = document.getElementById("modal-icon-container");
const closeModalBtn = document.getElementById("close-modal-btn");

complaintTextDiv.style.display = "none";
solutionTextDiv.style.display = "none";

function validateForm() {
  const result = {
    "full-name": true,
    email: true,
    "order-no": true,
    "product-code": true,
    quantity: true,
    "complaints-group": true,
    "complaint-description": true,
    "solutions-group": true,
    "solution-description": true,
  };
  result["full-name"] = !fullName.validity.valueMissing;

  if (email.validity.typeMismatch || email.validity.valueMissing) {
    result.email = false;
  }

  if (orderNo.validity.patternMismatch) {
    result["order-no"] = false;
  }

  if (productCode.validity.patternMismatch) {
    result["product-code"] = false;
  }

  const qtyValue = Number(qty.value.trim());
  if (isNaN(qtyValue) || qtyValue <= 0 || !Number.isInteger(qtyValue)) {
    result.quantity = false;
  }

  const checkedComplaints = document.querySelectorAll(
    "#complaints-group input:checked",
  );
  if (checkedComplaints.length < 1) {
    result["complaints-group"] = false;
  }

  if (complaintOther && complaintOther.checked) {
    if (complaintDesc.value.length < 20) {
      result["complaint-description"] = false;
    }
  }

  const checkedSolutions = document.querySelectorAll(
    "#solutions-group input:checked",
  );
  if (checkedSolutions.length < 1) {
    result["solutions-group"] = false;
  }

  if (solutionOther && solutionOther.checked) {
    if (solutionDesc.value.length < 20) {
      result["solution-description"] = false;
    }
  }

  return result;
}

function isValid(resultObject) {
  return Object.values(resultObject).every((value) => value === true);
}

form.addEventListener("change", (e) => {
  const triggeredField = e.target;
  const report = validateForm();
  if (triggeredField === fullName) {
    fullName.style.borderColor = report["full-name"] ? "green" : "red";
  }
  if (triggeredField === email) {
    email.style.borderColor = report.email ? "green" : "red";
  }
  if (triggeredField === orderNo) {
    orderNo.style.borderColor = report["order-no"] ? "green" : "red";
  }
  if (triggeredField === productCode) {
    productCode.style.borderColor = report["product-code"] ? "green" : "red";
  }
  if (triggeredField === qty) {
    qty.style.borderColor = report.quantity ? "green" : "red";
  }

  if (triggeredField.closest("#complaints-group")) {
    complaintsGroup.style.borderColor = report["complaints-group"]
      ? "green"
      : "red";
  }

  if (complaintOther) {
    complaintTextDiv.style.display = complaintOther.checked ? "block" : "none";
  }
  if (triggeredField === complaintDesc || triggeredField === complaintOther) {
    if (complaintOther && complaintOther.checked) {
      complaintDesc.style.borderColor = report["complaint-description"]
        ? "green"
        : "red";
    } else {
      complaintDesc.style.borderColor = "";
    }
  }
  if (solutionOther) {
    solutionTextDiv.style.display = solutionOther.checked ? "block" : "none";
  }
  if (triggeredField.closest("#solutions-group")) {
    solutionsGroup.style.borderColor = report["solutions-group"]
      ? "green"
      : "red";
  }
  if (triggeredField === solutionDesc || triggeredField === solutionOther) {
    if (solutionOther && solutionOther.checked) {
      solutionDesc.style.borderColor = report["solution-description"]
        ? "green"
        : "red";
    } else {
      solutionDesc.style.borderColor = "";
    }
  }
});

function showCustomModal(message, isSuccess) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;

  if (isSuccess) {
    modalTitle.textContent = "Submission Successful";
    modalTitle.style.color = "var(--success-green)";
  } else {
    modalTitle.textContent = "Validation Failed";
    modalTitle.style.color = "var(--error-red)";
  }

  modalBackdrop.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  modalBackdrop.classList.add("hidden");
});

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    modalBackdrop.classList.add("hidden");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const report = validateForm();
  const formPasses = isValid(report);
  if (formPasses) {
    showCustomModal(
      "Your customer complaint report has been successfully evaluated and submitted.",
      true,
    );
    console.log("Form passed validation");

    form.reset();
    const stylizedElements = [
      fullName,
      email,
      orderNo,
      productCode,
      qty,
      complaintsGroup,
      complaintDesc,
      solutionsGroup,
      solutionDesc,
    ];
    stylizedElements.forEach((el) => {
      if (el) el.style.borderColor = "";
    });
    complaintTextDiv.style.display = "none";
    solutionTextDiv.style.display = "none";
  } else {
    showCustomModal(
      "The validation matrix intercepted error attributes. Please update all highlighted input boundaries.",
      false,
    );
    fullName.style.borderColor = report["full-name"] ? "green" : "red";
    email.style.borderColor = report.email ? "green" : "red";
    orderNo.style.borderColor = report["order-no"] ? "green" : "red";
    productCode.style.borderColor = report["product-code"] ? "green" : "red";
    qty.style.borderColor = report.quantity ? "green" : "red";

    if (complaintsGroup) {
      complaintsGroup.style.borderColor = report["complaints-group"]
        ? "green"
        : "red";
    }
    if (complaintOther && complaintOther.checked) {
      complaintDesc.style.borderColor = report["complaint-description"]
        ? "green"
        : "red";
    } else {
      complaintDesc.style.borderColor = "";
    }

    if (solutionsGroup) {
      solutionsGroup.style.borderColor = report["solutions-group"]
        ? "green"
        : "red";
    }
    if (solutionOther && solutionOther.checked) {
      solutionDesc.style.borderColor = report["solution-description"]
        ? "green"
        : "red";
    } else {
      solutionDesc.style.borderColor = "";
    }
  }
});
