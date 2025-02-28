hexo.extend.filter.register('theme_inject', function (injects) {
    injects.footer.raw('artitalk-css', `<!-- 自定义样式 -->
<style>
    #artitalk_main .cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel {
        background: var(--link-hover-color);
        color: white;
    }
    #artitalk_main .cbp_tmtimeline>li .cbp_tmlabel {
        background:var(--link-hover-color);
        color: white;
    }
    #artitalk_main .cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:after {
        border-right-color: var(--link-hover-color);
    }
    #artitalk_main .cbp_tmtimeline>li .cbp_tmlabel:after {
        border-right-color: var(--link-hover-color);
    }
    #artitalk_main .at_button, #artitalk_main button,#artitalk_main .at_button:hover, #artitalk_main button:hover{
        background: var(--link-hover-color);
        color: white;
    }
</style>
<!-- 自定义样式.end -->
`);
    injects.footer.raw('artitalk-js', '<script crossorigin="anonymous" integrity="sha512-n13ZGPVFmdRwyUQz48IN58BlxySuwUOzsriqoUi3fkZC8+F4aB5RFCWGLeVzUqBFZR91NEY27GHHGZU9P/9ADQ==" src="https://lib.baomitu.com/artitalk/3.3.4/js/artitalk.min.js"></script>');
});

hexo.extend.injector.register('body_end', function () {
    return `
<script>
//在page-content下新增artitalk_main
document.addEventListener('DOMContentLoaded', function () {
    const pageContent = document.querySelector('.page-content');
    pageContent.innerHTML += '<div id="artitalk_main"></div>';
    new Artitalk({
        appId: 'fjHiLCWBGsokEAqaRldbH0Gt-MdYXbMMI', // Your LeanCloud appId
        appKey: 'HxBwkwAZqBBuEvF1kjVePM6V' // Your LeanCloud appKey
    });
});
</script>`;
}, 'shuoshuo');
