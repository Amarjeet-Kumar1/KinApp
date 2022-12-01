module.exports.first = function(req, res){
    return res.render('first_post',{
        title: "post"
    });
}