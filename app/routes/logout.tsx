
export default function Logout() {
return (
    <form action="/app/routes/logout" method="POST">
        <button id="logout-button" className="flow-buttons"> Log Out</button>
    </form>
)
}

// app.get('/logout', (req,res) => {
//     res.status(200).sendFile(path.join(__dirname, '../../frontend/login.html'))
// })
// app.post('/logout', (req,res) => {
//     try{
//         req.session.destroy((err) => {
//             if (err) {
//                 console.log(err)
//             }
//         })
//         res.end()
//     }
//     catch(err){
//         console.log(err)
//     }
// })