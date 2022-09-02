const loadCatagory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
    // .catch(error => console.log(error))
}

const displayCategory = (catagories) => {
    // console.log(catagories);
    catagories.forEach(catagory => {
        // console.log(catagory);
        const categoryContainer = document.getElementById('category-container');
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
}

// Diplay category detail

const displayCategoryDetail = (datas) => {
    // console.log(datas);
    datas.forEach(data => {
        console.log(data);
        const categoryDetailContainer = document.getElementById('category-detail-container');
        categoryDetailContainer.innerHTML = `
                    <div class=" card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="..." class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    })
}

loadCatagory();