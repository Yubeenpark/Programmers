function route(pathname, handle, response,productId){
   if (typeof handle[pathname] == 'function'){
    handle[pathname](response,productId);
}else{
    response.writeHead(404,{'Content-Type':'text/html'});
    response.write('Error Page <br> <h2>Not Found<h2>');
    response.end();
}

}
exports.route = route;