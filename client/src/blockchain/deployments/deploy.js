async function main() {
  const CONTRACT = await ethers.getContractFactory("CONTRACT_NAME_HERE");
  const contract = await CONTRACT.deploy();
  console.log("Contract Deployed to Address:", contract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
