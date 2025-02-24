var Resume = React.createClass({
        displayName: "Resume",
        render: function() {
            var e = {
                backgroundImage: this.props.resume.background_image ?
                    "url(link)".replace("link", this.props.resume.background_image) :
                    ""
            };
            return React.createElement(
                "div", { className: "resume-container animated fadeInUp" },
                React.createElement(
                    "header", { style: e },
                    React.createElement("img", {
                        className: "avatar",
                        src: this.props.resume.avatar
                    })
                ),
                React.createElement(BasicInfo, {
                    basicinfo: this.props.resume.basicinfo
                }),
                React.createElement(Social, { social: this.props.resume.social }),
                React.createElement(ExperienceList, {
                    type: "社团/组织",
                    experiences: this.props.resume.socialExperiences
                }),
                React.createElement(ExperienceList, {
                    type: "实习经历",
                    experiences: this.props.resume.InternExperiences
                })
            );
        }
    }),
    BasicInfo = React.createClass({
        displayName: "BasicInfo",
        render: function() {
            return React.createElement(
                "section", { className: "basicinfo" },
                React.createElement(
                    "div", { className: "text-info name" },
                    this.props.basicinfo.name
                ),
                React.createElement(
                    "div", { className: "text-info description" },
                    this.props.basicinfo.description
                ),
                React.createElement(
                    "div", { className: "text-info" },
                    React.createElement("i", { className: "fa fa-university" }),
                    this.props.basicinfo.school,
                    "·",
                    this.props.basicinfo.profession
                ),
                React.createElement(
                    "div", { className: "text-info" },
                    React.createElement("i", { className: "fa fa-user" }),
                    this.props.basicinfo.sex,
                    "·",
                    this.props.basicinfo.education,
                    "·",
                    this.props.basicinfo.workage
                ),
                React.createElement(
                    "div", { className: "phone text-info inline-block" },
                    this.props.basicinfo.phone ?
                    React.createElement(
                        "div",
                        null,
                        React.createElement("i", { className: "fa fa-phone" }),
                        React.createElement(
                            "a", { href: "tel:" + this.props.basicinfo.phone },
                            this.props.basicinfo.phone
                        )
                    ) :
                    ""
                ),
                React.createElement(
                    "div", { className: "email text-info inline-block" },
                    this.props.basicinfo.email ?
                    React.createElement(
                        "div",
                        null,
                        React.createElement("i", { className: "fa fa-envelope-o" }),
                        React.createElement(
                            "a", { href: "mailto:" + this.props.basicinfo.email },
                            this.props.basicinfo.email
                        )
                    ) :
                    ""
                )
            );
        }
    }),
    Social = React.createClass({
        displayName: "Social",
        render: function() {
            return React.createElement(
                "section", { className: "social" },
                this.props.social.map(function(e) {
                    return e.icon ?
                        React.createElement(
                            "a", { href: e.link, key: e.type + e.link },
                            React.createElement("img", { src: e.icon })
                        ) :
                        React.createElement("a", {
                            className: "fa fa-" + e.type,
                            href: e.link,
                            key: e.type + e.link
                        });
                })
            );
        }
    }),
    ExperienceList = React.createClass({
        displayName: "ExperienceList",
        render: function() {
            return React.createElement(
                "section", { className: "experiencelist" },
                React.createElement(
                    "div", { className: "experience-type" },
                    this.props.type
                ),
                this.props.experiences.map(function(e) {
                    return React.createElement(Experience, {
                        experience: e,
                        key: e.name
                    });
                })
            );
        }
    }),
    Experience = React.createClass({
        displayName: "Experience",
        render: function() {
            return React.createElement(
                "section", { className: "experience" },
                React.createElement(
                    "div", { className: "clearfix item" },
                    (function(e) {
                        return e && "" != e ?
                            React.createElement(
                                "div", { className: "icon fl" },
                                React.createElement("img", { src: e })
                            ) :
                            void 0;
                    })(this.props.experience.icon),
                    React.createElement(
                        "div", { className: "fl name-title" },
                        React.createElement(
                            "div", { className: "name" },
                            this.props.experience.name_link ?
                            React.createElement(
                                "a", { href: this.props.experience.name_link },
                                this.props.experience.name
                            ) :
                            React.createElement("a", null, this.props.experience.name),
                            this.props.experience.name_link ?
                            React.createElement("i", { className: "fa fa-link" }) :
                            ""
                        ),
                        React.createElement(
                            "div", { className: "title" },
                            this.props.experience.title
                        )
                    ),
                    React.createElement(
                        "div", { className: "fr time-location" },
                        React.createElement(
                            "div", { className: "time" },
                            this.props.experience.time
                        ),
                        React.createElement(
                            "div", { className: "location" },
                            this.props.experience.location ?
                            React.createElement(
                                "div",
                                null,
                                React.createElement("i", { className: "fa fa-map-marker" }),
                                this.props.experience.location
                            ) :
                            ""
                        )
                    )
                ),
                this.props.experience.description ?
                React.createElement(
                    "div", { className: "description" },
                    this.props.experience.description
                ) :
                ""
            );
        }
    });
fetch("/resume/data/resume.json")
    .then(function(e) {
        return e.json();
    })
    .then(function(e) {
        React.render(
            React.createElement(Resume, { resume: e }),
            document.getElementById("container")
        );
    })["catch"](function(e) {
        console.log("parsing failed", e);
    });
