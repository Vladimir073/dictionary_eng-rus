import { FC, memo } from "react";
import { DictionaryModel } from "../../../models/state/dictionary_state.model";

export const ItemDictionary: FC<DictionaryModel> = memo(({ rus, eng }) => {
  return (
    <li>
      <span>{rus}</span>
      <span>{eng}</span>
    </li>
  );
});
