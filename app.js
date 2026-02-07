document.addEventListener('DOMContentLoaded', function () {
    const template = new Template();
    const crud = new Crud(template);
    crud.viewEventList();

    document.getElementById("logo").addEventListener("click", () => {
      crud.viewEventList();
    });

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        crud.searchEvents();
    });

    document.getElementById("filterCategoryBtn").addEventListener("click", () => {
      crud.openCategoryFilterMenu();
    });
});