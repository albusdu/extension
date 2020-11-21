let words = [
  'Essential',
  'things',
  'cat',
  'think',
  'about',
  'before',
  'starting',
  'blog',
  'difficult',
  'awesome',
]
// setTimeout(() => {
//   document
//     .querySelector('.cke_wysiwyg_frame')
//     .contentWindow.document.addEventListener('keyup', (e) => {
//       e.preventDefault()
//       if (e.keyCode == 32 || e.keyCode == 13) {
//         let html = document.querySelector('.cke_wysiwyg_frame').contentWindow
//           .document.body.innerHTML
//         let document1 = document.querySelector('.cke_wysiwyg_frame')
//           .contentWindow.document
//         let w = words.join('|')
//         let reg = new RegExp('(?:^|\\s)' + ` |${w}`, 'gi')
//         html = html.replace(
//           reg,
//           (word) => `<u style='color: green'>${word}</u>`
//         )
//         document.querySelector(
//           '.cke_wysiwyg_frame'
//         ).contentWindow.document.body.innerHTML = html
//         setCaret(document1)
//       }
//     })
// }, 1500)
// const setCaret = (document1) => {
//   let selection = document1.getSelection()
//   // console.log(selection)
//   let range = selection.getRangeAt(0)
//   // console.log(range)
//   let childElements = document.querySelector('.cke_wysiwyg_frame').contentWindow
//     .document.body.childElementCount
//   console.log(childElements)
//   range.setStart(selection.anchorNode, childElements)
//   range.setEnd(selection.anchorNode, childElements)
//   selection.removeAllRanges()
//   selection.addRange(range)
// }
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
const getIframe = (iframe) => {
  return new Promise((resolve, reject) => {
    if (iframe) {
      return resolve(iframe)
    } else {
      reject('iframe not found')
    }
  })
}
const getKeyup = (iframe) => {
  return new Promise((resolve, reject) => {
    if (iframe.contentDocument) {
      iframe.contentDocument.addEventListener('keyup', (e) => {
        e.preventDefault()

        let iHtml = iframe.contentDocument.body.innerHTML
        let w = words.join('|')
        let reg = new RegExp('(?:^|\\s)' + ` |${w}`, 'gi')
        if (iHtml.match(reg)) {
          if (e.keyCode == 32 || e.keyCode == 13) {
            let sel = iframe.contentDocument.getSelection()
            iHtml = iHtml.replace(
              reg,
              (word) => `<u style="color:green">${word}</u>`
            )
            console.log(window)
            return resolve('')
          }
        }
      })
    } else {
      reject('iframe not found')
    }
  })
}
async function spellCheck() {
  try {
    await timeout(1000)
    const iframe = await getIframe(document.querySelector('.cke_wysiwyg_frame'))
    const sel = await getKeyup(iframe)
    console.log(sel)
  } catch (err) {
    console.log(err)
  }
}
// spellCheck()
//load
document.addEventListener('DOMContentLoaded', spellCheck())
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(msg)
})
