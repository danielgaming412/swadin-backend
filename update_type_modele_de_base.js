const strapi = require('@strapi/strapi');

async function main() {
  const strapiInstance = await strapi().load();

  const primeChQuery = strapiInstance.db.query("api::prime-ch.prime-ch");

  // Update entries where modele_de_base equals "Standard"
  await primeChQuery.updateMany({
    where: {
        modele_de_base: "Standard"
    },
    data: {
        type_modele_de_base: "Standard"
    },
  });

  await primeChQuery.updateMany({
    where: {
        $not:{
            modele_de_base: "Standard"
        }
    },
    data: {
        type_modele_de_base: "Alternatif"
    },
  });

  console.log("All entries updated successfully");
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
