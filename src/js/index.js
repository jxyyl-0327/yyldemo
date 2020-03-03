
        function getList() {
            $.ajax({
                url: '../lib/nav_top.json',
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                    let str = ''
                    res.forEach(item => {
                        str += `<li>${item.name}</li>`
                    })
                    $('.bot-center>ul').html(str)
                        .on({
                            mouseenter: () => $('.bot-box').stop().slideDown(),
                            mouseleave: () => $('.bot-box').stop().slideUp()
                        })
                        .children('li')
                        .on("mouseover", function () {
                            const index = $(this).index()
                            const list = res[index].list
                            let str = ''
                            list.forEach(item => {
                                str += `<li>
                                            <div>
                                                <img src="${ item.list_url }" alt="">
                                            </div>
                                            <p class="title">${ item.list_name }</p>
                                                <span class="price">${ item.list_price }
                                                </span>
                                        </li>`
                            })
                            $('.bot-box > ul').html(str)
                        })
                    $('.bot-box')
                        .on({
                            mouseover: function () {
                                $(this).finish().show()
                            },
                            mouseout: function () {
                                $(this).finish().slideUp()
                            }
                        })
                }
            })
        }