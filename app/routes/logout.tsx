
export default function Logout() {
return (
    <form action="/app/routes/logout" method="POST">
        <button id="logout-button" className="flow-buttons"> Log Out</button>
    </form>
)
}