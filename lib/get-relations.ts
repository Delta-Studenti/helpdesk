export const getRelations = (selections, string = "", array = []) => {
  selections.map((x) => {
    if (x.selectionSet) {
      array.push(string + x.name.value);
      getRelations(
        x.selectionSet.selections,
        string + x.name.value + ".",
        array,
      );
      if (x.name.value === "ticketTags") {
        array.push(string + x.name.value + ".tag");
      }
    }
  });
  return array;
};
