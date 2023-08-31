const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const catagories = data.data;
  displayData(catagories);
};

loadData();

const displayData = (catagories) => {
  const tabContianer = document.getElementById("tab-container");
  catagories.news_category.slice(0, 3).forEach((catagory) => {
    // console.log(catagory);
    const tabItems = document.createElement("div");
    tabItems.innerHTML = `
    <a class="tab text-lg hover:bg-green-400 rounded" onClick ="loadDetailsNews('${catagory.category_id}')">${catagory.category_name}</a>
    `;
    tabContianer.appendChild(tabItems);
  });
};

const loadDetailsNews = async (category_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${category_id}`
  );
  const data = await res.json();
  const categoryInfo = data.data;
  displayDetailsNews(categoryInfo);
};
loadDetailsNews();

const displayDetailsNews = (categoryInfo) => {
  const cardContainer = document.getElementById("card-container");
  categoryInfo.forEach((item) => {
    const cardItem = document.createElement("div");
    cardItem.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
      <img
        src="${item.image_url}"
        alt="Shoes"
        class="rounded-xl"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${item.title.slice(0, 40)}...</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions">
        <button class="btn btn-primary capitalize" onClick = "btnDetailsModal('${
          item._id
        }')">See Full News</button>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(cardItem);
  });
};

const btnDetailsModal = async (news_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${news_id}`
  );
  const data = await res.json();
  const idsInfo = data.data[0];
  btnDetailsModalDisplay(idsInfo);
};

const btnDetailsModalDisplay = (idsInfo) => {
  console.log(idsInfo);
  const modalContaner = document.getElementById("modal-container");
  modalContaner.innerHTML = `
  
      <dialog id="newsDetailsModal" class="modal">
            <form method="dialog" class="modal-box">
              <h3 class="font-bold text-lg">${idsInfo.author.name}</h3>
              <p class="py-4">${idsInfo.details}</p>
              <div class="modal-action">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </div>
            </form>
          </dialog>
  
      `;

  newsDetailsModal.showModal();
};
