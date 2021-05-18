//import {mdc} from '../../node_modules/@material'

let tabBar
$(document).ready(() => {
    initComponents()
    $(".main_logo").click(() => {
        $("#tab_home").trigger("click")
    })
    tabBar.activateTab(0)
    clickTabs()
})

function initComponents() {
    document.querySelectorAll('.mdc-text-field').forEach(value => {
        new mdc.textField.MDCTextField(value)
    })
    document.querySelectorAll('.mdc-button').forEach(value => {
        new mdc.ripple.MDCRipple(value)
    })
    document.querySelectorAll('.mdc-icon-button').forEach(value => {
        let br = new mdc.ripple.MDCRipple(value)
        br.unbounded = true;
    })
    document.querySelectorAll('.mdc-tab-bar').forEach(value => {
        tabBar = new mdc.tabBar.MDCTabBar(value)
    })
}

function clickTabs() {
    $("#tab_home").click(() => {
        tabBar.activateTab(0)
        location.href = "/"
    })
    $("#tab_category").click(() => {
        tabBar.activateTab(1)
        location.href = "/category"
    })
    $("#tab_closet").click(() => {
        tabBar.activateTab(2)
        location.href = "/closet"
    })
    $("#tab_coordination").click(() => {
        tabBar.activateTab(3)
        location.href = "/coordination"
    })
}