const { faker } = require("@faker-js/faker");

// async function bulkPublish(concurrency = 100) {
//   const items = await strapi.entityService.findMany("api::prime-ch.prime-ch", { published_at: null, _limit: 100 });

//   const updateItem = async (item) => {
//     try {
//       console.log("publishing item ", `${items.indexOf(item)}/${items.length}`);
//       await strapi.entityService.update("api::prime-ch.prime-ch", item.id, {
//         data: {
//           published_at: new Date().toISOString()
//         },
//       });
//     } catch (err) {
//       console.error("Error updating item:", err);
//     }
//   };

//   const chunkArray = (array, chunkSize) => {
//     const chunks = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       chunks.push(array.slice(i, i + chunkSize));
//     }
//     return chunks;
//   };

//   const itemChunks = chunkArray(items, concurrency);

//   try {
//     for (const chunk of itemChunks) {
//       const updatePromises = chunk.map((item) => updateItem(item));
//       await Promise.all(updatePromises);
//     }

//     console.log("All items published successfully.");
//   } catch (err) {
//     console.error("An error occurred while bulk publishing:", err);
//   }
// }

async function bulkPublish() {
  const items = await strapi.entityService.findMany("api::prime-ch.prime-ch", { publishedAt: null });
 
  const updateItem = async (item) => {
    try {
      console.log("publishing item ", `${items.indexOf(item)}/${items.length}`);
      await strapi.entityService.update("api::prime-ch.prime-ch", item.id, {
        data: {
          publishedAt: new Date().toISOString()
        },
      });
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  try {
    const updatePromises = items.map((item) => updateItem(item));
    await Promise.all(updatePromises);
    console.log("All items published successfully.");
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
        categories: faker.datatype.number({ min: 21, max: 30 })
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
