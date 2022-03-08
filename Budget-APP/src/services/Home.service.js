/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 23/07/18.
 */


import { getRequest, postRequest } from '../util/AxiosService.util';

export async function serviceGetQuestions(params) {
    return await getRequest('questions', { ...params });
}

export async function serviceGetCategories(params) {
    return await getRequest('categories', { ...params, per_page: 30 })
}

export async function serviceGetCategoryPosts(params) {
    return await getRequest('posts', { ...params, per_page: 20 },{});
}

export async function servieGetStates() {
    return await getRequest('states', {},{});
}
export async function serviceUpdateBudget(params, headers) {
    return await postRequest('person/budget/update', params, headers);
}//Aqui é o erro do budget q ele fala ? o erro do undefined acontece aqui ou na api ? onde q aparece a mensagem 

export async function serviceGetBudget(params, headers) {

    console.log("")
    console.log("Entrando na rota. ")
    console.log("")

    console.log("")
    console.log("Params: "+params)
    console.log("")

    console.log("")
    console.log("headers: "+headers)
    console.log("")

    return await getRequest('person/budget', params, headers);
}
