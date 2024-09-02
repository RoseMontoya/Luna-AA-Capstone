import "./EntriesList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEntries } from "../../../redux/entries";
import { Loading, Icon, Activities, Levels } from "../../subcomponents";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./EntriesList.css";
import { BsDot } from "react-icons/bs";
// import { csrfFetch } from "../../../redux/csrf";
import { getAllIcons } from "../../../redux/icons";
import { getAllActivities } from "../../../redux/activities";
import { getAllLevels } from "../../../redux/levels";
import { DeleteEntryModal } from "../../modals";
import OpenModalButton from "../../modals/OpenModalButton/OpenModalButton";
import { useNav } from "../../../context/navContext";

function EntriesListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const { navOpen } = useNav();
  console.log('navOpennnn', navOpen)

  const entriesObj = useSelector((state) => state.entries.allEntries);
  // const entriesObj = useLoaderData()
  const entries = entriesObj ? Object.values(entriesObj).sort((a, b) => new Date(b.datetime) - new Date(a.datetime)) : [];
  const icons = useSelector(state => state.icons.allIcons)

  const allActsObj = useSelector((state) => state.activities.allActivities)
  const allLevels = useSelector(state => state.levels.allLevels)
  useEffect(() => {
    if (!entriesObj && user) {
      dispatch(getAllEntries(user.id));
    }
    if (!icons) {
      dispatch(getAllIcons())
    }
    if (!allActsObj) {
      dispatch(getAllActivities())
    }
    if (!allLevels) {
      dispatch(getAllLevels())
    }
  }, [dispatch, entriesObj, user, icons, allActsObj, allLevels]);

  if (!user) return <Navigate to="/" replace={true} />;
  //
  if (!entriesObj || !icons || !allActsObj || !allLevels) return <Loading />;

  return (
    <main className={`${navOpen? "nav-open" : ''}`}>
        <h1>Entries:</h1>
      <div className="entries-container">
        {entries.length? entries.map((entry) => (
          <div className="entry" key={entry.id} onClick={() => navigate(`${entry.id}`)}>
            <div className="entry-header">
              <div className="entry-info">
                <div className="mood-icon">
                  <Icon icons={icons} id={entry.iconId} />
                </div>
                <div className="entry-info-text">
                    <h2>{entry.date}</h2>
                    <h3>{entry.mood}</h3>
                    <p>{entry.time}</p>
                </div>
              </div>
              <div className="entry-buttons">
                <p onClick={(e) => {e.stopPropagation(); navigate(`${entry.id}/edit`)}}>Edit</p>
                <BsDot />
                <div onClick={(e) => e.stopPropagation()}>
                  <OpenModalButton
                  className='delete-entry-btn'
                  buttonText="Delete"
                  modalComponent={<DeleteEntryModal  entry={entry} entries={entries}/>}
                                />
                </div>
              </div>
            </div>
            <div className="entry-details">
                <div className="levels-container container">
                  <div className="level">
                    <h2>Overall: </h2>
                    <div className="rating">{entry.overallMood}</div>
                  </div>
                    <Levels levels={allLevels} entryLvls={entry.EntryLevels} />
                </div>
                <div className="activities-container container">
                  <h2>What have you been up to?</h2>
                  <div className="acts">
                    <Activities icons={icons} activities={allActsObj} entryActs={entry.EntryActivities}/>
                  </div>
                </div>
                <div className="note-container container">
                  <h2>Note:</h2>
                  <p>{entry.note}</p>
                </div>
            </div>
          </div>
        )) : (
          <div className="no-entries">
            <p>No entries available</p>
            <Link to='new'>Create Entry</Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default EntriesListPage;


// export const entriesLoader = async(user) => {
//   const response = await csrfFetch(`/api/users/${user.id}/entries`)

//   const data = await response.json()

//     data.map(entry => {
//       const formattedDate = format(entry.datetime, "EEEE, MMM d . h:mm a").split(" . ")
//       entry.date = formattedDate[0]
//       entry.time = formattedDate[1]
//     })
//     return data
// }
