class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.string :email
      t.integer :user_id, references: :user
      t.timestamps
    end
  end
end
