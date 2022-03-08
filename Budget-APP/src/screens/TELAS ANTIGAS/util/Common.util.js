/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 23/07/18.
 */

import Constants from '../config/Constants.config';

export function getImageFromContent(content) {
    const urls = [],
        rex = /<img.*?src=["'](.*?)["']/g;
    let m = '';
    while(m = rex.exec( content )) {
        urls.push( m[1] );
    }
    if(urls.length > 0) {
        const tempUrl = urls[0];
        const tempReg = new RegExp(Constants.DEFAULT_URL,"g");
        if(tempReg.test(tempUrl)) {
        const tempName = tempUrl.substring(tempUrl.lastIndexOf('/')+1);
        const tempPath = tempUrl.substring(tempUrl.lastIndexOf('/')+1, 0);
        const tempArr = tempName.split('.');
        const tempNewName = ((tempArr[0].replace(/-[0-9]{3,4}x[0-9]{3,4}/, ""))); ///[0-9]{3,4}x[0-9]{3,4}/.test(tempArr[0]) ? tempArr[0] : tempArr[0]+'-150x150';
        return {
            thumb_image:tempPath + tempNewName + '-150x150' +'.'+tempArr[1],
            header_image: urls[Math.floor(Math.random()*urls.length)],
            all_images: urls
        };
        } else {
            return {
                thumb_image: tempUrl,
                header_image: urls[Math.floor(Math.random()*urls.length)],
                all_images: urls,
            };
        }
    } else {
        return {
            thumb_image: 'https://www.gannett-cdn.com/-mm-/b49fec7254f5c9f43cf1c459a367f0f9f64ba4b5/c=23-0-394-279/local/-/media/2018/04/04/OHGroup/Mansfield/636584357263012203-breaking-news-art.JPG?width=534&height=401&fit=crop',
            header_image: 'https://www.gannett-cdn.com/-mm-/b49fec7254f5c9f43cf1c459a367f0f9f64ba4b5/c=23-0-394-279/local/-/media/2018/04/04/OHGroup/Mansfield/636584357263012203-breaking-news-art.JPG?width=534&height=401&fit=crop',
            all_images: [],
        };
    }
}

export function numberWithCommas(nStr){
    
    nStr += '';
   
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
   
    while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    
    return x1 + x2;
   }