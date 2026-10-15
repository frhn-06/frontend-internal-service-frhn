const revealVariants = {
    keatas: {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0
        }
    },

    kebawah: {
        hidden: {
            opacity: 0,
            y: -40
        },
        visible: {
            opacity: 1,
            y: 0
        }
    },

    kekiri: {
        hidden: {
            opacity: 0,
            x: 40
        },
        visible: {
            opacity: 1,
            x: 0
        }
    },

    kekanan: {
        hidden: {
            opacity: 0,
            x: -40
        },
        visible: {
            opacity: 1,
            x: 0
        }
    },

    membesar: {
        hidden: {
            opacity: 0,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            scale: 1
        }
    },

    muncul: {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        }
    },





    container: {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3
            }
        }
    },


    item: {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }
}

export default revealVariants;