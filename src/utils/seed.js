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
  const items = await strapi.documents("api::prime-ch.prime-ch").findMany({ publishedAt: null });

  const updateItem = async (item) => {
    try {
      console.log("publishing item ", `${items.indexOf(item)}/${items.length}`);
      await strapi.documents("api::prime-ch.prime-ch").update({
        documentId: "__TODO__",

        data: {
          publishedAt: new Date().toISOString()
        }
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
  console.log("deleting items")
  const items = await strapi.db.query("api::primes-ch-2024.primes-ch-2024").findMany(
    {
      where: {
        type_modele_de_base: {
          $null: true,
        },
      }, 
    }); 
  try { 
    const promises = items.map(item => {
      console.log("deleting item ", item.id);
      return strapi.documents("api::primes-ch-2024.primes-ch-2024").delete({
        documentId: "__TODO__"
      });
    });
    await Promise.all(promises);
  } catch (err) {
    console.error("An error occurred while bulk deleting:", err);
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

async function seedFormAnalyticCollection() {
  const numberOfRecordsToCreate = 100;
  const STEPSNAME = {
    foyer_step: "foyer_step",
    modele_de_base_step: "modele_de_base_step",
    information_assurance_actuelle_step: "information_assurance_actuelle_step",
    information_assurance_de_base_step: "information_assurance_de_base_step",
    prestation_complémentaire_step: "prestation_complémentaire_step",
  };

  for (let i = 0; i < numberOfRecordsToCreate; i++) {
    await strapi.documents("api::form-analytic.form-analytic").create({
      data: {
        step_number: faker.datatype.number({ min: 1, max: 5 }),
        step_name: faker.helpers.enumValue(STEPSNAME),
        publishedAt: faker.date.past(),
      },
    });
  }
}

module.exports = { bulkPublish, deleteBulk, seedArticlesCollection, seedFormAnalyticCollection };
