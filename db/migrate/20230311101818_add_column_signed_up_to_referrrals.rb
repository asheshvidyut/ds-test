class AddColumnSignedUpToReferrrals < ActiveRecord::Migration[7.0]
  def change
    add_column :referrals, :signed_up, :datetime
  end
end
