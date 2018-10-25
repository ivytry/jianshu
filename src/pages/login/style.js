import styled from 'styled-components';

export const LoginWrapper = styled.div`
	width:100%;
	height:100%;
	margin: 0 auto;
	background:#f1f1f1;
`;

export const LoginBox = styled.div`
	width: 400px;
	margin: 60px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
    display:block;
    box-sizing: border-box;
    h4{
    	font-size: 18px;
    	font-weight: 400;
    	color: #969696;
    	text-align: center;
    	margin: 0 auto 50px;
    	padding: 10px;
    	a{
    		text-decoration: none;
    		color: #969696;
    		padding: 10px;
    		font-weight: 700;
            :hover{
                border-bottom: 2px solid #ea6f5a;
            }
    	}
    	.active{
    		color: #ea6f5a;
    		border-bottom: 2px solid #ea6f5a;
    	}
    }
    form{
    	margin: 0 0 20px;
    	margin-bottom: 30px;
    	.restyle{
    		position: relative;
    		width: 100%;
            input{
                border-bottom: none;
                width: 100%;
                height: 50px;
                margin-bottom: 0;
                padding: 4px 12px 4px 35px;
                border: 1px solid #c8c8c8;
                border-radius: 0 0 4px 4px;
                background-color: hsla(0,0%,71%,.1);
                vertical-align: middle;
                box-sizing: border-box;
                &.ic-user{
                    border-radius: 4px 4px 0 0;
                }
                &.ic-password{
                    margin-top:-1px;
                }
            }
    	}
        i{
            position: absolute;
            top: 15px;
            left: 10px;
            font-size: 18px;
            color: #969696;
        }
        .remember-btn{
            float: left;
            margin: 15px 0;
            span{
                margin-left: 5px;
                font-size: 15px;
                color: #969696;
                vertical-align: middle;
            }
        }
        .forget-btn{
            float: right;
            position: relative;
            margin: 15px 0;
            font-size: 14px;
            a{
                color: #999;
                cursor:pointer;
                :hover{
                    color:#333;
                }
            }
            .dropdown-menu{
                position: absolute;
                z-index: 1000;
                display: none;
                float: left;
                min-width: 160px;
                padding: 5px 0;
                margin: 2px 0 0;
                list-style: none;
                font-size: 14px;
                text-align: left;
                background-color: #fff;
                border: 1px solid #ccc;
                border: 1px solid rgba(0,0,0,.15);
                border-radius: 4px;
                box-shadow: 0 6px 12px rgba(0,0,0,.175);
                background-clip: padding-box;
                margin-top: 0;
                border-color: transparent;
                box-shadow: 0 2px 8px rgba(0,0,0,.1);
                top: 20px;
                left: auto;
                right: 0;
                border-radius: 4px;
                li{
                    :hover{
                        background-color:#f5f5f5;
                    }
                    line-height: 20px;
                    a{
                        display: block;
                        clear: both;
                        font-weight: 400;
                        line-height: 1.42857;
                        white-space: nowrap;
                        padding: 10px 20px;
                        color: #333;
                        text-decoration:none;
                    }
                }
            }
        }
	    button{
	    	display:block;
	    	width:100%;
	    	line-height:30px;
	    	margin:20px 0 20px;
	    	background:#3194d0;
		    padding: 8px 10px;
		    font-size: 16px;
		    border: none;
		    border-radius: 25px;
		    color: #fff;
		    cursor: pointer;
		    outline: none;
		    clear: both;
            :hover{
                background-color:#2083c0;
            }
	    }
    }
    .more-sign{
    	margin-top: 50px;
        h6{
            position: relative;
            margin: 0 0 10px;
            font-size: 12px;
            color: #b5b5b5;
            text-align: center;
            :before{
                content: "";
                border-top: 1px solid #b5b5b5;
                display: block;
                position: absolute;
                width: 60px;
                top: 5px;
                left: 30px;
                box-sizing: border-box;
            }
            :after{
                content: "";
                border-top: 1px solid #b5b5b5;
                display: block;
                position: absolute;
                width: 60px;
                top: 5px;
                right: 30px;
                box-sizing: border-box;
            }
        }
        ul{
            text-align: center;
            font-size: 14px;
            li{
                margin: 0 5px;
                display: inline-block;
                line-height: 20px;
                &.hide{
                    display: none!important;
                }
                a{
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                    display: block;
                    text-decoration:none;
                    i{
                        font-size: 28px;
                    }
                    .ic-weibo{
                        color: #e05244;
                    }
                    .ic-wechat{
                        color: #00bb29;
                    }
                    .ic-qq_connect{
                        color: #498ad5;
                    }
                    .ic-douban{
                        color: #00820f;
                        font-size:22px;
                    }
                }
            }
        }
    }
`;

