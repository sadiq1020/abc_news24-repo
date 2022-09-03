const loadCatagory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
    // .catch(error => console.log(error))
}

const displayCategory = (catagories) => {
    // console.log(catagories);
    const categoryContainer = document.getElementById('category-container');
    catagories.forEach(catagory => {
        // console.log(catagory);
        const catDiv = document.createElement('div');
        catDiv.classList.add('container-fluid');
        catDiv.innerHTML = `        
            <div class="navbar-nav">                         
                <a onclick="loadCategoryDetail('${catagory.category_id}')" class="nav-link" href="#"><strong>${catagory.category_name}</strong></a>
            </div>
        `;
        categoryContainer.appendChild(catDiv);
    })

}



// load category details 

const loadCategoryDetail = (catagoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetail(data.data))
    // .catch(error => console.log(error))

    // start loader
    const newsSpinner = document.getElementById('loader');
    newsSpinner.classList.remove('d-none');
}

// Display category detail

const displayCategoryDetail = (datas) => {
    // console.log(datas);
    const categoryDetailContainer = document.getElementById('category-detail-container');
    categoryDetailContainer.innerHTML = ``;



    datas.forEach(data => {
        console.log(data);
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${data.thumbnail_url}" class="img-fluid ms-5 rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.details.slice(0, 300)}...</p>                          
                            <div class="d-flex justify-content-between pt-5">
                                <p class="card-text"><small class="text-muted"><span> <img id="author-img" src="${data.author.img}" class="rounded-circle" alt="..."> </span>Author: ${data.author.name ? data.author.name : 'No data found'}</small></p>
                                
                                <p class="card-text"><small class="text-muted">Views: ${data.total_view ? data.total_view : 'No data found'}</p>
                                <button onclick="loadModal('${data._id}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        categoryDetailContainer.appendChild(detailDiv);
    })
    // stop loader 
    const newsSpinner = document.getElementById('loader');
    newsSpinner.classList.add('d-none');
}

// load category modal

const loadModal = (modalId) => {
    const url = `https://openapi.programming-hero.com/api/news/${modalId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
    // .catch(error => console.log(error))
}

const displayModal = (data) => {
    console.log(data);
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <h5>${data.title}</h5>
    <h6>Author name: ${data.author.name}</h6>
    <p>Published date: ${data.author.published_date}</p>
    <img src="${data.author.img}" class="rounded-circle w-25 h-auto" alt="...">
    <p><strong>News details: </strong> ${data.details}</p>
    <img src="${data.image_url}" class="img-fluid" alt="...">
    <p class="fst-italic"><small>Total views: ${data.total_view ? data.total_view : 'No data found'}</small></p>
    `
}

loadCatagory();

// ms-5 