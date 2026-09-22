import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, UserCheck, CheckCircle2, Building2, Plus, Sparkles, X } from 'lucide-react';

export default function CustomerFeedbackPage({ onAddToast }) {
  const [reviews, setReviews] = useState([
    { id: 'REV-101', branch: 'Downtown Main Branch', reviewer: 'Alex Morgan (Head Teller)', rating: 5, category: 'Hardware Support', comment: 'James Wilson resolved our passbook printer jam in under 20 minutes! Excellent service.', date: 'Today, 2:15 PM' },
    { id: 'REV-102', branch: 'Metro Central Branch', reviewer: 'Sarah Jenkins (Branch Manager)', rating: 4, category: 'Core Banking App', comment: 'Core banking SQL query speed improved after index optimization. Thanks IT team!', date: 'Yesterday, 4:40 PM' },
    { id: 'REV-103', branch: 'Airport Plaza Branch', reviewer: 'Raj Sharma (Operations Lead)', rating: 5, category: 'ATM Support', comment: 'Drive-Thru ATM cash refill dispatch was fast and seamless.', date: '14 Aug 2026' },
  ]);

  const [newReview, setNewReview] = useState({ branch: 'Downtown Main Branch', reviewer: 'Teller Counter #2', rating: 5, category: 'Hardware Support', comment: '' });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const entry = {
      id: `REV-${104 + reviews.length}`,
      ...newReview,
      date: 'Just now'
    };

    setReviews([entry, ...reviews]);
    setNewReview({ branch: 'Downtown Main Branch', reviewer: 'Teller Counter #2', rating: 5, category: 'Hardware Support', comment: '' });
    setShowAddModal(false);
    if (onAddToast) onAddToast('Feedback Submitted ⭐', `Thank you! 5-star rating recorded for ${entry.branch}.`, 'success');
  };

  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(2);

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <span>Branch Staff IT Satisfaction &amp; CSAT Rating Engine</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time feedback ratings from branch tellers &amp; managers on IT service desk ticket responsiveness
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 shadow-glow shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Submit IT Feedback</span>
        </button>
      </div>

      {/* Top Rating Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Overall Branch CSAT Score</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-amber-400">{avgRating}</span>
            <span className="text-xs text-white/50 font-bold">/ 5.0 Stars ⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-bold border-t border-white/10 pt-1">96.4% Teller Satisfaction Rate</p>
        </div>

        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Total Verified Reviews</span>
          <div className="text-3xl font-black font-mono text-white">{reviews.length + 42}</div>
          <p className="text-[11px] text-white/50 font-medium border-t border-white/10 pt-1">15 Active Branches Reporting</p>
        </div>

        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Top Rated Service Category</span>
          <div className="text-lg font-extrabold text-[#00f5ff]">Hardware &amp; Printer Support</div>
          <p className="text-[11px] text-emerald-400 font-bold border-t border-white/10 pt-1">Avg 4.92 / 5.0 Rating</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 text-white shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Recent Teller &amp; Branch Manager Feedback Log</h3>

        <div className="space-y-3">
          {reviews.map(rev => (
            <div key={rev.id} className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-[#00f5ff]">{rev.id}</span>
                  <h4 className="font-extrabold text-white">{rev.reviewer}</h4>
                  <span className="text-[11px] text-white/50">• {rev.branch}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-1">{rev.rating}.0</span>
                </div>
              </div>

              <p className="text-white/90 text-xs font-medium leading-relaxed bg-black/40 p-3 rounded-2xl border border-white/10">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-white/50 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-bold border border-white/10">{rev.category}</span>
                <span className="font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Feedback Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in text-white">
          <div className="w-full max-w-md bg-[#0a0b10] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-extrabold text-white">Submit IT Support Rating</h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-white/70 uppercase block mb-1">Star Rating:</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-white/70 uppercase block mb-1">Feedback Comments:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share feedback on IT ticket resolution speed, engineer professionalism..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white font-extrabold text-xs shadow-glow cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
