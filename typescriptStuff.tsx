
import memoize from "lodash/memoize";
import { ImageSource } from "./@types";


export const getImageSource = memoize((images): ImageSource[] =>
    images.map((image) =>
      typeof image.original === "number"
        ? image.original
        : { uri: image.original as string }
    )
  );