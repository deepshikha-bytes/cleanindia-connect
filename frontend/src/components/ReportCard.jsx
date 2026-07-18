import { useState } from "react";

function ReportCard({
  report,
  onStatusChange,
  onAddComment,
  onDelete,
  canDelete,
  isDeleting,
}) {
  const [commentData, setCommentData] = useState({
    author: "",
    text: "",
  });

  const [commentMessage, setCommentMessage] = useState("");

  const statusColor =
    report.status === "Resolved"
      ? "bg-green-100 text-green-700"
      : report.status === "In Progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  function handleCommentChange(event) {
    const { name, value } = event.target;

    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();

    if (!commentData.text.trim()) {
      setCommentMessage("Please write a comment or suggestion.");
      return;
    }

    if (!onAddComment) {
      setCommentMessage("Comments are not available here.");
      return;
    }

    try {
      await onAddComment(report.id, {
        author: commentData.author.trim(),
        text: commentData.text.trim(),
      });
    } catch (error) {
      setCommentMessage(error.message);
      return;
    }

    setCommentData({
      author: "",
      text: "",
    });

    setCommentMessage("Comment added successfully!");

    setTimeout(() => {
      setCommentMessage("");
    }, 3000);
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-green-100 overflow-hidden">
      {(report.image || report.imageUrl) && (
        <img
          src={report.image || report.imageUrl}
          alt={report.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{report.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{report.location}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onStatusChange ? (
              <select
                value={report.status}
                onChange={(event) =>
                  onStatusChange(report.id, event.target.value)
                }
                className={`px-3 py-2 rounded-full text-xs font-semibold border-0 ${statusColor}`}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            ) : (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
              >
                {report.status}
              </span>
            )}

            {canDelete && (
              <button
                type="button"
                onClick={() => onDelete(report.id)}
                disabled={isDeleting}
                className="rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 text-gray-600">{report.description}</p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
            {report.type}
          </span>

          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            Urgency: {report.urgency}
          </span>

          {canDelete && (
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
              Created on this browser
            </span>
          )}
        </div>

        <div className="mt-6 border-t border-green-100 pt-6">
          <h3 className="text-lg font-bold text-gray-900">
            Community Suggestions
          </h3>

          {report.comments && report.comments.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {report.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-green-50 rounded-2xl p-4 border border-green-100"
                >
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Shared by {comment.author}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-gray-500 text-sm">
              No suggestions yet. Be the first to share an idea.
            </p>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-5 grid gap-3">
            {commentMessage && (
              <p
                className={`text-sm font-medium ${
                  commentMessage.includes("successfully")
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {commentMessage}
              </p>
            )}

            <input
              type="text"
              name="author"
              value={commentData.author}
              onChange={handleCommentChange}
              maxLength="60"
              placeholder="Your name optional"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <textarea
              name="text"
              value={commentData.text}
              onChange={handleCommentChange}
              maxLength="250"
              rows="3"
              placeholder="Share a suggestion, awareness message, or solution idea..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>

            <p className="text-xs text-gray-500">
              {commentData.text.length}/250 characters
            </p>

            <button
              type="submit"
              className="bg-green-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Add Suggestion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
