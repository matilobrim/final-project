// Create object to store card data
const taskManager = new TaskManager();

// Form fields
const title = document.querySelector("#title");
const status = document.querySelector("#status");
const description = document.querySelector("#desc");
const assign = document.querySelector("#assign");
const dueDate = document.querySelector("#dueDate");

const fields = [title, description, assign, status, dueDate];

const addBtn = document.querySelector(".addButton");
const submitBtn = document.querySelector("#submit-btn");

// Modal
const formModal = new bootstrap.Modal(document.getElementById("task-form"), {});

let invalidFields = 0;

const formSubmission = (event) => {
	validateFields(fields);
	dateIsValid();

	event.preventDefault();

	// Allows card creation only if fields are all valid
	if (invalidFields === 0) {
		submitData();
		clearForm(fields);

		// Grabs just submitted task info from .tasks
		const cardData = taskManager.tasks[taskManager.tasks.length - 1];

		addCard(cardData);
		return;
	} else if (invalidFields > 0) {
		invalidFields = 0;
		return;
	}
};

const validateFields = (fields) => {
	let fieldValues = [
		title.value,
		description.value,
		assign.value,
		status.value,
		dueDate.value,
	];

	// Validates first 3 fields for length < 5
	for (let i = 0; i < 3; i++) {
		if (fieldValues[i] === "" || fieldValues[i].length < 5) {
			fields[i].classList.remove("is-valid");
			fields[i].classList.add("is-invalid");
			invalidFields++;
		} else {
			fields[i].classList.remove("is-invalid");
			fields[i].classList.add("is-valid");
		}
	}

	// Validates status and date fields for length > 0
	for (let i = 3; i < 5; i++) {
		if (fieldValues[i].length === 0) {
			fields[i].classList.remove("is-valid");
			fields[i].classList.add("is-invalid");
			invalidFields++;
		} else {
			fields[i].classList.remove("is-invalid");
			fields[i].classList.add("is-valid");
		}
	}
};

function dateIsValid() {
	// Grab current date
	const currentDate = new Date();

	// Ensures month number is correct and double digit
	let month = currentDate.getUTCMonth() + 1;
	if (month < 10) {
		let fixedMonth = month.toString();
		fixedMonth = "0" + fixedMonth;
		month = fixedMonth;
	}

	// Ensures day is double digit value
	let day = currentDate.getUTCDate();
	if (day < 10) {
		let fixedDay = day.toString();
		fixedDay = "0" + fixedDay;
		day = fixedDay;
	}

	// Converts current date into an integer (yyyymmdd format)
	const currentFormattedDate = `${currentDate.getUTCFullYear()}${month}${day}`;
	const integerCurrentDate = parseInt(currentFormattedDate);

	// Converts dueDate-field value to an integer (yyyymmdd format)
	let fixedFormFieldValue = dueDate.value.replace(/-/g, "");
	let integerFormFieldValue = parseInt(fixedFormFieldValue);

	// Compares value of form field to value of current date
	if (integerFormFieldValue >= integerCurrentDate) {
		dueDate.classList.remove("is-invalid");
		dueDate.classList.add("is-valid");
	} else {
		dueDate.classList.remove("is-valid");
		dueDate.classList.add("is-invalid");
		invalidFields++;
	}
}