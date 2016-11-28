declare interface IImagesWithJQueryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'imagesWithJQueryStrings' {
  const strings: IImagesWithJQueryStrings;
  export = strings;
}
