const Member = require('../models/Member');
const { mutipleMongooseToObject }=require('../../util/mongoose')

class SiteController {

    index(req, res, next) {
        res.render('home');
    }

    // [POST] /store
    store(req, res, next) {
        req.body.refer = Math.floor(Math.random() * 100000) + 100000;
        req.body.point = 100;
        if(req.body.code == ""){
            req.body.code = 1;
        }
        const new_member = new Member(req.body);
        new_member.save()
            .then(() => {
                // res.json(req.body);
                if (req.body.code != 1) {
                    Member.findOne({ refer: req.body.code })
                        .then(member => {
                            // res.json(member);
                            var new_point = member.point + 10;
                            Member.updateOne({ refer: member.refer }, { point: new_point })
                                .then(() => {
                                    if (member.code != 1){
                                        Member.findOne({ refer: member.code })
                                        .then(member_2 => {
                                            var new_point_2 = member_2.point + 5;
                                            Member.updateOne({ refer: member_2.refer }, { point: new_point_2 })
                                                .then(() => res.redirect("/list"))
                                                .catch(next);
                                            // res.json(member_2)
                                        })
                                        .catch(next);
                                    }else{
                                        res.redirect("/list")
                                    }
                                    
                                })
                                .catch(next);
                        })
                        .catch(next);
                } else {
                    res.redirect("/list");
                }
            })
            .catch(next);
    }

    //[GET] /show
    show(req, res, next) {
        Member.find({})
            .then(members => {
                res.render('list', {
                    members: mutipleMongooseToObject(members),
                })
                // res.json(members)
            })
            .catch(next);
    }

}

module.exports = new SiteController();
