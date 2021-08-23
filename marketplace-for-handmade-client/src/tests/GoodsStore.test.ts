import GoodsStore from "../stores/GoodsStore";

it("pagination set page", async function () {
    const store = new GoodsStore();
    await store.setPage(3);

    expect(store.currentPage).toEqual(3);
});

it("pagination previous page", async function () {
    const store = new GoodsStore();
    await store.setPage(3);
    await store.previousPage();

    expect(store.currentPage).toEqual(2);
});

it("pagination next page", async function () {
    const store = new GoodsStore();
    await store.setPage(3);
    await store.nextPage();

    expect(store.currentPage).toEqual(4);
});

it("pagination reset goods", async function () {
    const store = new GoodsStore();
    await store.setPage(3);
    await store.resetGoods();

    expect(store.currentPage).toEqual(1);
});

