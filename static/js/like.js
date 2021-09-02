$(document).ready(function(){
    // if user clicks on like btn
    // Page.Server.ScriptTimeout = 300;

    $('.like-btn').on('click', function(){

        // $(this is pointing to .like-btn class i.e like button)
        // .data('id') is receiving the value from data-id attribute
        var post_id = $(this).data('id');
        var user_id = $('#user').val();
        $clicked_btn = $(this);

        if ($clicked_btn.hasClass('fas fa-2x fa-thumbs-up')) {
            action = 'like';
        } else if ($clicked_btn.hasClass('far fa-2x fa-thumbs-up')) {
            action = 'unlike';
        }
        $.ajax({
            url: 'blogPage.php?id='+ post_id + "user_id=" + user_id,
            type: 'POST',
            data: {
                'action': action,
                'post_id': post_id
            },
            success: function(data) {
                res = JSON.parse(data);
                if (action == 'like') {
                    $clicked_btn.removeClass('fas fa-2x fa-thumbs-up');
                    $clicked_btn.addClass('far fa-2x fa-thumbs-up');
                } else if(action == 'unlike') {
                    $clicked_btn.removeClass('far fa-2x fa-thumbs-up');
                    $clicked_btn.addClass('fas fa-2x fa-thumbs-up');
                }

                // display number of likes and dislikes
                $clicked_btn.siblings('span.likes').text(res.likes);
                $clicked_btn.siblings('span.dislikes').text(res.dislikes);

                // change button styling of the other button if user is reacting for the second time to the post
                $clicked_btn.siblings('i.fas fa-2x fa-thumbs-down').removeClass('fas fa-2x fa-thumbs-down').addClass('far fa-2x fa-thumbs-down')
            }
        });
      
    })

    // if user clicks on dislike btn
    $('.dislike-btn').on('click', function(){

        // $(this is pointing to .like-btn class i.e like button)
        // .data('id') is receiving the value from data-id attribute
        var post_id = $(this).data('id');
        $clicked_btn = $(this);

        if ($clicked_btn.hasClass('fas fa-2x fa-thumbs-down')) {
            action = 'dislike';
        } else if ($clicked_btn.hasClass('far fa-2x fa-thumbs-down')) {
            action = 'undislike';
        }
        $.ajax({
            url: 'blogPage.php',
            type: 'post',
            data: {
                'action': action,
                'post_id': post_id
            },
            success: function(data) {
                res = JSON.parse(data);
                if (action == 'dislike') {
                    $clicked_btn.removeClass('fas fa-2x fa-thumbs-down');
                    $clicked_btn.addClass('far fa-2x fa-thumbs-down');
                } else if(action == 'undislike') {
                    $clicked_btn.removeClass('far fa-2x fa-thumbs-down');
                    $clicked_btn.addClass('fas fa-2x fa-thumbs-down');
                }

                // display number of likes and dislikes
                $clicked_btn.siblings('span.likes').text(res.likes);
                $clicked_btn.siblings('span.dislikes').text(res.dislikes);

                // change button styling of the other button if user is reacting for the second time to the post
                $clicked_btn.siblings('i.fas fa-2x fa-thumbs-up').removeClass('fas fa-2x fa-thumbs-up').addClass('far fa-2x fa-thumbs-up')  ;
            }
        })
    })    
})