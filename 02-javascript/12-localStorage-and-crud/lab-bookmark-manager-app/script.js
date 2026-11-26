const mainSection = document.getElementById("main-section"); //
const categoryDropdown = document.getElementById("category-dropdown"); //
const viewCategoryBtn = document.getElementById("view-category-button");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const formSection = document.getElementById("form-section");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const closeFormBtn = document.getElementById("close-form-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");
const categoryName = document.querySelectorAll(".category-name");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const categoryList = document.getElementById("category-list");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const getBookmarks = () => {
  try {
    const dataBM = JSON.parse(localStorage.getItem("bookmarks"));
    if (
      Array.isArray(dataBM) &&
      dataBM.every(
        (item) =>
          item.hasOwnProperty("name") &&
          item.hasOwnProperty("category") &&
          item.hasOwnProperty("url"),
      )
    ) {
      return dataBM;
    }
    return [];
  } catch {
    return [];
  }
};

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

addBookmarkBtn.addEventListener("click", () => {
  categoryName[0].innerText =
    categoryDropdown.value.charAt(0).toUpperCase() +
    categoryDropdown.value.slice(1);
  displayOrCloseForm();
});

addBookmarkBtnForm.addEventListener("click", () => {
  const bookmarkObj = {
    name: nameInput.value,
    category: categoryDropdown.value,
    url: urlInput.value,
  };
  let { name, category, url } = bookmarkObj;
  if (name.length && url.length) {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(getBookmarks().concat(bookmarkObj)),
    );
    nameInput.value = "";
    urlInput.value = "";
    displayOrCloseForm();
  } else {
    alert("Please, provide valid name and URL.");
  }
});

closeFormBtn.addEventListener("click", displayOrCloseForm);

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

const fillBookmarkList = () => {
  categoryName[1].innerText =
    categoryDropdown.value.charAt(0).toUpperCase() +
    categoryDropdown.value.slice(1);
  const bookmarksToDisplay = getBookmarks().filter(
    (i) => i.category === categoryDropdown.value,
  );
  if (bookmarksToDisplay.length) {
    categoryList.innerHTML = "";
    for (const bookmark of bookmarksToDisplay) {
      categoryList.innerHTML += `
            <div>
              <input type="radio" name="bookmarks" id="${bookmark.name}" value="${bookmark.name}">
              <label for="${bookmark.name}">
                <a href="${bookmark.url}">${bookmark.name}</a>
              </label>
            </div>`;
    }
  } else {
    categoryList.innerHTML = "<p>No Bookmarks Found</p>";
  }
};

viewCategoryBtn.addEventListener("click", () => {
  fillBookmarkList();
  displayOrHideCategory();
});

closeListBtn.addEventListener("click", displayOrHideCategory);
const deleteBookmark = () => {
  const radioBookmarks = document.querySelectorAll('input[type="radio"]');
  for (const radioBookmark of radioBookmarks) {
    if (radioBookmark.checked) {
      const bookmarks = getBookmarks();
      const indexToRemove = bookmarks.findIndex(
        (i) =>
          i.name == radioBookmark.value &&
          i.category === categoryDropdown.value,
      );
      bookmarks.splice(indexToRemove, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      return;
    }
  }
};

deleteBookmarkBtn.addEventListener("click", () => {
  deleteBookmark();
  fillBookmarkList();
});
