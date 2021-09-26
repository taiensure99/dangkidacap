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
        const new_member = new Member(req.body);
        new_member.save()
            .then(() => {
                if (req.body.code != "") {
                    Member.findOne({ refer: req.body.code })
                        .then(member => {
                            var new_point = member.point + 10;
                            Member.updateOne({ refer: member.refer }, { point: new_point })
                                .then(() => {
                                    Member.findOne({ refer: member.code })
                                        .then(member_2 => {
                                            var new_point_2 = member_2.point + 5;
                                            Member.updateOne({ refer: member_2.refer }, { point: new_point_2 })
                                                .then(() => res.send("bạn đã đăng kí thành công"))
                                                .catch(next);
                                        })
                                        .catch(next);
                                })
                                .catch(next);
                        })
                        .catch(next);
                } else {
                    res.send("bạn đã đăng kí thành công");
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
