/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 23/07/18.
 */

import {  HOME_UPDATE_END, HOME_UPDATE_INITIATED, GET_HOME_DATA, UPDATE_HOME_DATA  } from '../actions/Home.action';
import { getImageFromContent } from '../util/Common.util'

const initialState = {

        is_posts_fetching: false, 
        error: false, 
        error_message: '', 
        posts: [], 
        page_id: 1, 
        is_first_loaded: false
     };

export default function (state = initialState, action) {

    switch (action.type) {

        case HOME_UPDATE_INITIATED: {

            return { ...state, is_posts_fetching: true };
        }

        case GET_HOME_DATA: {

            const tempData = action.payload.map((val) => {

                const tempImages = getImageFromContent(val.content.rendered);

               return {
                        ...val,
                        thumb_image: tempImages.thumb_image, 
                        header_image: tempImages.header_image, 
                        all_images: tempImages.all_images
                     }
            });

            const topBanners = tempData.splice(5);

            return { ...state, 

                posts: tempData, 
                banners: topBanners, 
                page_id: state.page_id + 1,
                is_first_loaded: true
             };
        }

        case UPDATE_HOME_DATA: {

            const tempData = action.payload.map((val) => {

                const tempImages = getImageFromContent(val.content.rendered);

                return { 
                    ...val, 
                    thumb_image: tempImages.thumb_image, 
                    header_image: tempImages.header_image, 
                    all_images: tempImages.all_images }
            });
            
            return { ...state, 
                posts: state.posts.concat(tempData), 
                page_id: state.page_id + 1 };
        }

        case HOME_UPDATE_END: {

            return { ...state,
                 is_posts_fetching: false };
        }
        default: {
            return state;
        }
    }
}