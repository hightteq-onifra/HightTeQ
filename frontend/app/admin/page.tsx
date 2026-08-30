import "./admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-container">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          Hight<span>TeQ</span>
        </div>

        <nav>
          <a className="active">
            <span>⌂</span>
            Dashboard
          </a>

          <a>
            <span>♙</span>
            Utilisateurs
          </a>

          <a>
            <span>▣</span>
            Produits
          </a>

          <a>
            <span>🛒</span>
            Commandes
          </a>

          <a>
            <span>⚙</span>
            Paramètres
          </a>
        </nav>

        <div className="sidebar-bottom">
          <p>Connecté en tant que</p>
          <strong>Administrateur</strong>
        </div>

      </aside>


      {/* Contenu principal */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">

          <div>
            <h1>Dashboard</h1>
            <p>Bienvenue dans votre espace administrateur.</p>
          </div>

          <div className="admin-profile">
            <div className="notification">🔔</div>

            <div className="avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <small>Administrateur</small>
            </div>
          </div>

        </header>


        {/* Statistiques */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon">👥</div>

            <div>
              <p>Utilisateurs</p>
              <h2>1,248</h2>
              <span className="positive">+12.5%</span>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon">📦</div>

            <div>
              <p>Produits</p>
              <h2>86</h2>
              <span className="positive">+8.2%</span>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon">🛒</div>

            <div>
              <p>Commandes</p>
              <h2>324</h2>
              <span className="positive">+15.4%</span>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon">💰</div>

            <div>
              <p>Chiffre d'affaires</p>
              <h2>4.8M Ar</h2>
              <span className="positive">+10.8%</span>
            </div>
          </div>

        </section>


        {/* Partie inférieure */}
        <section className="dashboard-grid">

          {/* Statistiques */}
          <div className="panel chart-panel">

            <div className="panel-header">
              <div>
                <h2>Statistiques</h2>
                <p>Évolution des commandes</p>
              </div>

              <select>
                <option>Cette semaine</option>
                <option>Ce mois</option>
                <option>Cette année</option>
              </select>
            </div>

            <div className="chart-placeholder">

              <div className="chart-line">
                ╱╲__╱╲___╱╲
              </div>

              <p>Graphique des commandes</p>

            </div>

          </div>


          {/* Activité récente */}
          <div className="panel">

            <div className="panel-header">
              <div>
                <h2>Activité récente</h2>
                <p>Dernières actions</p>
              </div>
            </div>

            <div className="activity">

              <div className="activity-item">
                <div className="activity-icon">👤</div>

                <div>
                  <strong>Nouvel utilisateur</strong>
                  <p>Il y a 5 minutes</p>
                </div>
              </div>


              <div className="activity-item">
                <div className="activity-icon">📦</div>

                <div>
                  <strong>Nouveau produit ajouté</strong>
                  <p>Il y a 20 minutes</p>
                </div>
              </div>


              <div className="activity-item">
                <div className="activity-icon">🛒</div>

                <div>
                  <strong>Nouvelle commande</strong>
                  <p>Il y a 35 minutes</p>
                </div>
              </div>


              <div className="activity-item">
                <div className="activity-icon">✓</div>

                <div>
                  <strong>Commande terminée</strong>
                  <p>Il y a 1 heure</p>
                </div>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}