import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './Images.module.scss';
import * as strings from 'imagesStrings';
import { IImagesWebPartProps } from './IImagesWebPartProps';
const Masonry: any = require('masonry');

export default class ImagesWebPart extends BaseClientSideWebPart<IImagesWebPartProps> {
  private masonry: any = undefined;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <h2>${this.properties.description}</h2>
      <div class="${styles.images}"></div>`;

    for (let i: number = 0; i < 15; i++) {
      const img: Element = document.createElement('img');
      const height: number = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      img.setAttribute('src', `http://lorempixel.com/150/${height}/?d=` + new Date().getTime().toString());
      img.setAttribute('width', '150');
      img.setAttribute('height', height.toString());
      this.domElement
        .querySelector(`div.${styles.images}`)
        .appendChild(img);
    }

    if (this.renderedOnce) {
      this.masonry.destroy();
    }

    this.masonry = new Masonry(this.domElement.querySelector(`div.${styles.images}`), {
      itemSelector: 'img',
      columnWidth: 150,
      gutter: 10
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
