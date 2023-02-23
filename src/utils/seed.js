const { faker } = require("@faker-js/faker");

async function bulkPublish() {
  const items = await strapi.entityService.findMany("api::prime-ch.prime-ch", { published_at: null });
  try {
    const promises = items.map(item => {
      return strapi.entityService.update("api::prime-ch.prime-ch", item.id, {
        data: {
          published_at: new Date().toISOString()
        },
      });
    });

    await Promise.all(promises);
  } catch (err) {
    console.error("An error occurred while bulk publishing:", err);
  }
}

async function deleteBulk() {
  const items = await strapi.entityService.findMany("api::prime-ch.prime-ch", { published_at: null });
  try {
    const promises = items.map(item => {
      console.log("deleting item ", item.id);
      return strapi.entityService.delete("api::prime-ch.prime-ch", item.id);
    });
    await Promise.all(promises);
  } catch (err) {
    console.error("An error occurred while bulk publishing:", err);
  }
}

async function seedArticlesCollection() {
  const numberOfRecordsToCreate = 10;

//   faker for articles
  for (let i = 0; i < numberOfRecordsToCreate; i++) {
    // 3
    await strapi.api.article.services.article.create({
      data: {
        titre: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        main_pic_url: faker.image.imageUrl(),
        picture_url_1: faker.image.imageUrl(),
        categories: faker.datatype.number({min:21, max:30})
      },
    });
  }

  // for (let i = 0; i < numberOfRecordsToCreate; i++) {
  //   // 3
  //   await strapi.api.categorie.services.categorie.create({
  //     data: {
  //       titre: faker.lorem.word(),
  //     },
  //   });
  // }
}

module.exports = { bulkPublish, deleteBulk, seedArticlesCollection };
