import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './ImagesWithJQuery.module.scss';
import * as strings from 'imagesWithJQueryStrings';
import { IImagesWithJQueryWebPartProps } from './IImagesWithJQueryWebPartProps';
import * as $ from 'jquery';
const Masonry: any = require('masonry');
const jQueryBridget: any = require('jquery-bridget/jquery-bridget');
jQueryBridget('masonry', Masonry, $);

export default class ImagesWithJQueryWebPart extends BaseClientSideWebPart<IImagesWithJQueryWebPartProps> {
  private $masonry: any = undefined;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <h2>${this.properties.description}</h2>
      <div class="${styles.imagesWithJQuery}"></div>`;

    const $container: JQuery = $(`.${styles.imagesWithJQuery}`, this.domElement);
    for (let i: number = 0; i < 15; i++) {
      const height: number = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      $container.append(`<img src="http://lorempixel.com/150/${height}/?d=${new Date().getTime().toString()}" width="150" height="${height}" />`);
    }

    if (this.renderedOnce) {
      this.$masonry.masonry('destroy');
    }

    this.$masonry = ($container as any).masonry({
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
